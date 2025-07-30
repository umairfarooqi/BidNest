import { useState } from 'react';

function ProposalForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setProposal('');

          try {
            const res = await fetch('http://localhost:3000/generate-proposal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ jobDescription }),
            });

            const data = await res.json();
            setProposal(data.proposal);
          } catch (err) {
            console.error('Error:', err);
            setProposal('Something went wrong. Please try again.');
          } finally {
            setLoading(false);
          }
        }}
        className="space-y-4"
      >
        <label className="block">
          <span className="text-lg font-medium">Paste Job Description</span>
          <textarea
            className="mt-1 w-full p-2 border rounded resize-y h-40"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job posting here..."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Proposal'}
        </button>
      </form>

      {proposal && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Proposal:</h2>
          <pre className="whitespace-pre-wrap">{proposal}</pre>
        </div>
      )}
    </div>
  );
}

export default ProposalForm;
