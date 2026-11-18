import { Component, type ErrorInfo, type ReactNode } from "react";
import { paths } from "./routes";

interface Props {
  // A new address clears the error, so navigating away recovers.
  resetKey: string;
  children: ReactNode;
}

// A page that fails to render shows this instead of leaving the whole screen
// blank. The navigation stays usable around it.
export default class PageErrorBoundary extends Component<Props, { failed: boolean; key: string }> {
  state = { failed: false, key: this.props.resetKey };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  static getDerivedStateFromProps(props: Props, state: { failed: boolean; key: string }) {
    return props.resetKey === state.key ? null : { failed: false, key: props.resetKey };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="bag-page" aria-labelledby="page-error-title">
        <header className="bag-page-heading">
          <h1 id="page-error-title">Something went wrong.</h1>
          <p>This page could not be shown. Your bag and account are safe.</p>
          <div className="page-error-actions">
            <button type="button" className="bag-button" onClick={() => window.location.reload()}>
              Reload the page
            </button>
            <a href={paths.store}>Back to the collection</a>
          </div>
        </header>
      </section>
    );
  }
}
