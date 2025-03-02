import { ResumeAnalysis } from "../types/resume";

interface Props {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

export const AnalysisDisplay = ({ analysis, onReset }: Props) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-700 h-[750px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Analysis</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Upload Another Resume
        </button>
      </div>

      <div className="grid gap-6">
        <Section title="Key Skills">
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Experience Summary">
          <p className="text-gray-700">{analysis.experience}</p>
        </Section>

        <Section title="Recommendations">
          <ul className="list-disc pl-5 space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">
                {rec}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Areas for Improvement">
          <ul className="list-disc pl-5 space-y-2">
            {analysis.improvements.map((imp, index) => (
              <li key={index} className="text-gray-700">
                {imp}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    {children}
  </div>
);
