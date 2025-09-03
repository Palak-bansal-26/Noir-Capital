import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialJobs = [
  // Example job
  {
    id: 1,
    title: 'Software Engineer',
    description: '<ul><li>Develop web applications</li><li>Collaborate with team</li></ul>',
    formType: 'external',
    formLink: 'https://forms.gle/example',
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const JobRolesManager = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    formType: 'external',
    formLink: '',
    formFile: null,
    status: 'Active',
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      description: job.description,
      formType: job.formType,
      formLink: job.formLink,
      formFile: null,
      status: job.status,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleDeactivate = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: j.status === 'Active' ? 'Inactive' : 'Active', updated_at: new Date().toISOString() } : j));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // For demo, just store file name if uploaded
    const jobData = {
      ...form,
      formFileName: form.formFile ? form.formFile.name : '',
      updated_at: new Date().toISOString(),
    };
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? {
        ...j,
        ...jobData,
      } : j));
    } else {
      setJobs([
        ...jobs,
        {
          id: Date.now(),
          ...jobData,
          created_at: new Date().toISOString(),
        }
      ]);
    }
    setShowForm(false);
    setEditingJob(null);
    setForm({ title: '', description: '', formType: 'external', formLink: '', formFile: null, status: 'Active' });
  };

  return (
  <div style={{padding:'2rem', background:'#23243a', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
  <h2 style={{color:'#FFC107', fontWeight:800, fontSize:'2rem'}}>Add Job</h2>
        <button onClick={() => { setShowForm(true); setEditingJob(null); setForm({ title: '', description: '', formType: 'external', formLink: '', status: 'Active' }); }} style={{padding:'0.7rem 2rem', background:'#43ea7a', border:'none', borderRadius:'6px', fontWeight:'bold', color:'#23243a', boxShadow:'0 2px 8px #43ea7a33'}}>+ Add Job</button>
      </div>
      <div style={{overflowX:'auto', boxShadow:'0 2px 16px #23243a44', borderRadius:'1rem', background:'#23243a'}}>
        <table style={{width:'100%', background:'#23243a', borderRadius:'1rem', boxShadow:'0 2px 16px #23243a44', overflow:'hidden', borderCollapse:'separate', borderSpacing:0, fontSize:'1rem'}}>
          <thead>
            <tr style={{background:'#181a20', color:'#43ea7a', fontWeight:800, fontSize:'1.08rem'}}>
              <th style={{padding:'1rem 0.7rem', textAlign:'left'}}>Title</th>
              <th style={{padding:'1rem 0.7rem', textAlign:'center'}}>Status</th>
              <th style={{padding:'1rem 0.7rem', textAlign:'center'}}>Form</th>
              <th style={{padding:'1rem 0.7rem', textAlign:'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, idx) => (
              <tr key={job.id} style={{background:idx%2===0?'#23243a':'#181a20', color:'#fff'}}>
                <td style={{padding:'0.9rem 0.7rem', fontWeight:700, color:'#43ea7a', verticalAlign:'middle'}}>{job.title}</td>
                <td style={{padding:'0.9rem 0.7rem', textAlign:'center', fontWeight:600, verticalAlign:'middle'}}>
                  <span style={{padding:'0.3rem 1rem', borderRadius:'20px', background: job.status === 'Active' ? '#43ea7a22' : '#ffc10722', color: job.status === 'Active' ? '#43ea7a' : '#ffc107', fontWeight:'bold'}}>{job.status}</span>
                </td>
                <td style={{padding:'0.9rem 0.7rem', textAlign:'center', verticalAlign:'middle'}}>{job.formType === 'external' ? <a href={job.formLink} target="_blank" rel="noopener noreferrer" style={{color:'#FFC107', textDecoration:'underline'}}>External Form</a> : <span style={{color:'#FFC107'}}>Built-in Form</span>}</td>
                <td style={{padding:'0.9rem 0.7rem', textAlign:'center', verticalAlign:'middle'}}>
                  <button onClick={() => handleDeactivate(job.id)} style={{marginRight:'0.5rem', padding:'0.5rem 1rem', background: job.status === 'Active' ? '#f44336' : '#43ea7a', border:'none', borderRadius:'6px', fontWeight:'bold', color:'#fff'}}>{job.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => handleDelete(job.id)} style={{padding:'0.5rem 1rem', background:'#eee', border:'none', borderRadius:'6px', fontWeight:'bold', color:'#23243a'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
  <div style={{background:'#0a174e', padding:'2rem', borderRadius:'10px', boxShadow:'0 6px 32px #FFC10733', maxWidth:'520px', margin:'2rem auto'}}>
          <h3 style={{color:'#23243a', fontWeight:700, fontSize:'1.3rem', marginBottom:'1.5rem'}}>{editingJob ? 'Edit Job' : 'Add Job'}</h3>
          <form onSubmit={handleFormSubmit}>
            <div style={{marginBottom:'1.2rem'}}>
              <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Job Title:</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{width:'100%', padding:'0.7rem', borderRadius:'6px', border:'1px solid #eee', fontSize:'1rem'}} />
            </div>
            <div style={{marginBottom:'1.2rem'}}>
              <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Job Description:</label>
              <ReactQuill value={form.description} onChange={val => setForm({...form, description: val})} style={{background:'#f8f8f8', borderRadius:'6px'}} />
            </div>
            <div style={{marginBottom:'1.2rem'}}>
              <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Application Form:</label>
              <select value={form.formType} onChange={e => setForm({...form, formType: e.target.value})} style={{width:'100%', padding:'0.7rem', borderRadius:'6px', border:'1px solid #eee', fontSize:'1rem'}}>
                <option value="external">Paste Form Link</option>
                <option value="upload">Upload Form</option>
                <option value="builtin">Built-in Form</option>
              </select>
            </div>
            {form.formType === 'external' ? (
              <div style={{marginBottom:'1.2rem'}}>
                <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Form Link:</label>
                <input type="url" value={form.formLink} onChange={e => setForm({...form, formLink: e.target.value})} style={{width:'100%', padding:'0.7rem', borderRadius:'6px', border:'1px solid #eee', fontSize:'1rem'}} />
              </div>
            ) : form.formType === 'upload' ? (
              <div style={{marginBottom:'1.2rem'}}>
                <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Upload Form:</label>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => setForm({...form, formFile: e.target.files[0]})} style={{width:'100%', padding:'0.7rem', borderRadius:'6px', border:'1px solid #eee', fontSize:'1rem'}} />
                {form.formFile && <span style={{marginLeft:'0.5rem', color:'#23243a'}}>{form.formFile.name}</span>}
              </div>
            ) : (
              <div style={{marginBottom:'1.2rem'}}>
                <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Built-in Form Fields:</label>
                <ul style={{paddingLeft:'1.2rem', margin:'0'}}>
                  <li>Name</li>
                  <li>Email</li>
                  <li>Resume Upload</li>
                </ul>
              </div>
            )}
            <div style={{marginBottom:'1.2rem'}}>
              <label style={{fontWeight:600, marginBottom:'0.3rem', display:'block'}}>Status:</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{width:'100%', padding:'0.7rem', borderRadius:'6px', border:'1px solid #eee', fontSize:'1rem'}}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
              <button type="submit" style={{padding:'0.7rem 2rem', background:'#43ea7a', border:'none', borderRadius:'6px', fontWeight:'bold', color:'#23243a'}}>Save</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingJob(null); }} style={{padding:'0.7rem 2rem', background:'#eee', border:'none', borderRadius:'6px', fontWeight:'bold', color:'#23243a'}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobRolesManager;
