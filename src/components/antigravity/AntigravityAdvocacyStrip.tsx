/**
 * AntigravityAdvocacyStrip — Homepage “Who First” proof band
 * DR-775 / GAP-117: YouGov affordability anxiety (ACL s18 substantiation).
 * Pattern matches hero status pill + commercial navy section language.
 */

export function AntigravityAdvocacyStrip() {
  return (
    <section className="ag-advocacy-strip" aria-labelledby="ag-advocacy-heading">
      <div className="ag-container ag-advocacy-grid">
        <div className="ag-advocacy-stat" aria-hidden="true">
          <span className="ag-advocacy-stat-value">54%</span>
          <span className="ag-advocacy-stat-label">of insured Australians</span>
        </div>

        <div className="ag-advocacy-copy">
          <p className="ag-status-pill ag-advocacy-pill">
            <span className="ag-pulse-dot" aria-hidden="true" />
            Who First · Policyholder first, always
          </p>
          <h2 id="ag-advocacy-heading" className="ag-advocacy-heading">
            Cover affordability and availability worry more than half of insured Australians
            <sup>
              <a
                href="#yougov-footnote"
                className="ag-advocacy-cite"
                aria-label="See YouGov source footnote"
              >
                [a]
              </a>
            </sup>
          </h2>
          <p className="ag-advocacy-body">
            We are a human network of IICRC-certified contractors and advocates working for the
            policyholder, not the insurer.
          </p>
          <p id="yougov-footnote" className="ag-advocacy-source">
            [a] Source: YouGov April 2026 survey of insured Australian adults; methodology:
            nationally representative online panel.{' '}
            <a
              href="https://au.yougov.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              au.yougov.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
