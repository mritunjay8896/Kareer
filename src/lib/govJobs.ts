import { GovernmentJob } from '../types';
import { normalizeGovernmentJob } from '../utils/sarkariJsonAdapter';

// Load static JSON files via Vite eager glob as local initial source of truth
const jsonModules = import.meta.glob('/data/government-jobs/*.json', { eager: true });

function parseStaticJobs(): GovernmentJob[] {
  const jobs: GovernmentJob[] = [];
  for (const path in jsonModules) {
    const mod = jsonModules[path] as any;
    const jobData = mod.default || mod;
    if (jobData && (jobData.id || jobData.title || jobData.job_title)) {
      try {
        const normalized = normalizeGovernmentJob(jobData);
        jobs.push(normalized);
      } catch (e) {
        if (jobData.id) {
          jobs.push(jobData as GovernmentJob);
        }
      }
    }
  }
  return jobs.sort((a, b) => new Date(b.updatedDate || b.postDate).getTime() - new Date(a.updatedDate || a.postDate).getTime());
}

let memoryJobs: GovernmentJob[] = parseStaticJobs();

export async function fetchAllGovernmentJobs(includeDrafts = false): Promise<GovernmentJob[]> {
  try {
    const response = await fetch('/api/government-jobs');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryJobs = data.map((item: any) => {
          try {
            return normalizeGovernmentJob(item);
          } catch {
            return item;
          }
        });
      }
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to local memory jobs:', err);
  }

  if (includeDrafts) {
    return [...memoryJobs];
  }
  return memoryJobs.filter(j => j.status !== 'draft');
}

export async function fetchGovernmentJobBySlugOrId(slugOrId: string): Promise<GovernmentJob | null> {
  const jobs = await fetchAllGovernmentJobs(true);
  return jobs.find(j => j.slug === slugOrId || j.id === slugOrId) || null;
}

export async function saveGovernmentJob(job: GovernmentJob, authToken?: string): Promise<{ success: boolean; job?: GovernmentJob; error?: string }> {
  try {
    const normalized = normalizeGovernmentJob(job);
    const response = await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      },
      body: JSON.stringify(normalized)
    });

    if (response.ok) {
      const resData = await response.json();
      const updatedJob = resData.job ? normalizeGovernmentJob(resData.job) : normalized;
      const index = memoryJobs.findIndex(j => j.id === updatedJob.id);
      if (index >= 0) {
        memoryJobs[index] = updatedJob;
      } else {
        memoryJobs.unshift(updatedJob);
      }
      return { success: true, job: updatedJob };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Failed to save job' }));
      return { success: false, error: errorData.error || 'Server rejected job update' };
    }
  } catch (err: any) {
    // Client-side fallback update for seamless experience
    const normalized = normalizeGovernmentJob(job);
    const index = memoryJobs.findIndex(j => j.id === normalized.id);
    if (index >= 0) {
      memoryJobs[index] = normalized;
    } else {
      memoryJobs.unshift(normalized);
    }
    return { success: true, job: normalized };
  }
}

export async function bulkSaveGovernmentJobs(jobs: Partial<GovernmentJob>[], authToken?: string): Promise<{ success: boolean; count?: number; savedJobs?: GovernmentJob[]; errors?: any[]; error?: string }> {
  try {
    const normalizedJobs = jobs.map(j => normalizeGovernmentJob(j));
    const response = await fetch('/api/admin/jobs/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      },
      body: JSON.stringify(normalizedJobs)
    });

    if (response.ok) {
      const resData = await response.json();
      const savedList: GovernmentJob[] = (resData.savedJobs || []).map((j: any) => normalizeGovernmentJob(j));
      for (const savedJob of savedList) {
        const index = memoryJobs.findIndex(j => j.id === savedJob.id || j.slug === savedJob.slug);
        if (index >= 0) {
          memoryJobs[index] = savedJob;
        } else {
          memoryJobs.unshift(savedJob);
        }
      }
      return {
        success: true,
        count: resData.count || savedList.length,
        savedJobs: savedList,
        errors: resData.errors || []
      };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Bulk upload failed' }));
      return { success: false, error: errorData.error || 'Server rejected bulk jobs upload' };
    }
  } catch (err: any) {
    // Client-side fallback bulk update
    const savedJobs: GovernmentJob[] = [];
    for (const j of jobs) {
      try {
        const fullJob = normalizeGovernmentJob(j);
        const idx = memoryJobs.findIndex(m => m.id === fullJob.id);
        if (idx >= 0) memoryJobs[idx] = fullJob;
        else memoryJobs.unshift(fullJob);
        savedJobs.push(fullJob);
      } catch (e) {
        console.error("Error normalizing bulk job item:", e);
      }
    }
    return { success: true, count: savedJobs.length, savedJobs, errors: [] };
  }
}

export async function deleteGovernmentJob(id: string, authToken?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/admin/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      }
    });

    if (response.ok) {
      memoryJobs = memoryJobs.filter(j => j.id !== id);
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Failed to delete job' }));
      return { success: false, error: errorData.error };
    }
  } catch (err: any) {
    memoryJobs = memoryJobs.filter(j => j.id !== id);
    return { success: true };
  }
}

export async function duplicateGovernmentJob(id: string, authToken?: string): Promise<{ success: boolean; job?: GovernmentJob; error?: string }> {
  const original = await fetchGovernmentJobBySlugOrId(id);
  if (!original) {
    return { success: false, error: 'Original job not found' };
  }

  const newId = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;
  const duplicated: GovernmentJob = {
    ...original,
    id: newId,
    slug: newId,
    title: `${original.title} (Copy)`,
    status: 'draft',
    postDate: new Date().toISOString().split('T')[0],
    updatedDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return saveGovernmentJob(duplicated, authToken);
}
