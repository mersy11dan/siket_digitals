import { Component, type ReactNode } from 'react'

type BoundaryProps = {
  children: ReactNode
  fallback: ReactNode
}

type BoundaryState = {
  failed: boolean
}

export class WebGLBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
