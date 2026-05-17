// ============================================
// AtsScorePanel.jsx - ATS Scoring Display
// ============================================
// Analyze ATS readiness and view metric suggestions.
// ============================================

import './index.css';
import { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import { getAtsScore } from '../../services/aiService.js';
import AtsScoreCircle from '../AtsScoreCircle';
import AtsChecklistItem from '../AtsChecklistItem';
import SkillGapCard from '../SkillGapCard';
import ATS_METRICS from '../../constants/atsMetrics.js';
import { HiChartBar, HiExclamationTriangle, HiLightBulb } from 'react-icons/hi2';
import toast from 'react-hot-toast';

function AtsScorePanel() {
  const { resume, updateAtsScore } = useContext(ResumeContext);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const atsScore = resume.atsScore;

  const handleAnalyze = async () => {
    if (!resume._id) {
      toast.error('Save or upload your resume first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await getAtsScore(resume._id);
      updateAtsScore(result);
      toast.success('ATS analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-md flex-col gap-md">
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className={`btn btn-primary-gradient btn-full ${isAnalyzing ? 'btn-disabled' : ''}`}
      >
        {isAnalyzing ? (
          <>
            <div className="spinner spinner-sm" />
            Analyzing...
          </>
        ) : (
          <>
            <HiChartBar />
            Analyze Resume
          </>
        )}
      </button>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="flex-center p-lg">
          <div className="spinner" />
        </div>
      )}

      {/* Score Results */}
      {atsScore && (
        <>
          {/* Overall Score */}
          <div className="flex-center p-sm">
            <AtsScoreCircle score={atsScore.overall || 0} />
          </div>

          {/* Metric Breakdown */}
          {atsScore.breakdown && (
            <div className="flex-col gap-sm">
              <h3 className="section-title">Score Breakdown</h3>
              {ATS_METRICS.map((metric) => {
                const data = atsScore.breakdown[metric.key];
                if (!data) return null;
                return (
                  <AtsChecklistItem
                    key={metric.key}
                    label={metric.label}
                    score={data.score ?? data}
                    fix={data.fix || data.suggestion || ''}
                    weight={metric.weight}
                  />
                );
              })}
            </div>
          )}

          {/* Missing Keywords */}
          {atsScore.missingKeywords && atsScore.missingKeywords.length > 0 && (
            <div className="flex-col gap-sm">
              <div className="flex-row items-center gap-xs">
                <HiExclamationTriangle className="text-purple" />
                <h3 className="section-title">Missing Keywords</h3>
              </div>
              <div className="flex-row flex-wrap gap-xs">
                {atsScore.missingKeywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Present Keywords */}
          {atsScore.presentKeywords && atsScore.presentKeywords.length > 0 && (
            <div className="flex-col gap-sm">
              <h3 className="section-title">Matched Keywords</h3>
              <div className="flex-row flex-wrap gap-xs">
                {atsScore.presentKeywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag-present">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {atsScore.suggestions && atsScore.suggestions.length > 0 && (
            <div className="flex-col gap-sm">
              <div className="flex-row items-center gap-xs">
                <HiLightBulb className="text-purple" />
                <h3 className="section-title">Suggestions</h3>
              </div>
              <div className="flex-col gap-sm">
                {atsScore.suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          {atsScore.skillGaps && (
            <SkillGapCard
              missingSkills={atsScore.skillGaps.missing || []}
              recommendations={atsScore.skillGaps.recommendations || []}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!atsScore && !isAnalyzing && (
        <div className="empty-state">
          <p className="text-muted text-sm">
            Click Analyze Resume to see your ATS score.
          </p>
        </div>
      )}
    </div>
  );
}

export default AtsScorePanel;
