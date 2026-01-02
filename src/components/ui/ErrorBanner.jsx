const ErrorBanner = ({ title, message, onDismiss, onRetry }) => (
  <div className="ui-error-banner" role="status">
    <div className="ui-error-banner__content">
      {title && <p className="ui-error-banner__title">{title}</p>}
      {message && <p className="ui-error-banner__message">{message}</p>}
    </div>
    <div className="ui-error-banner__actions">
      {onRetry && (
        <button type="button" className="ui-error-banner__btn" onClick={onRetry}>
          Reintentar
        </button>
      )}
      {onDismiss && (
        <button type="button" className="ui-error-banner__btn ui-error-banner__btn--ghost" onClick={onDismiss}>
          Cerrar
        </button>
      )}
    </div>
  </div>
)

export default ErrorBanner
