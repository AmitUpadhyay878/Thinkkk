import React from "react"
import Button from '../Button'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      console.log(this.state.error.toString(),"Error");
      return (
        <section >
          <div className="errorboundary-box">
          <div className="something-wrongbox text-center">
            <div className="title">
            <h3>Something went wrong!</h3>
            </div>
            <p>{this.state.error && this.state.error.toString()}</p>
            <pre>{(this.state.errorInfo.componentStack)}</pre>
             <div className="wrong-btn">
            <Button text="Please Retry" isLink={false} onClick={() =>window.location.reload()} />
          </div>
          </div>
         
            </div>
        </section>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
