import React, { Component, PropTypes } from 'react';

const { node, func } = PropTypes;

export default function decorate(componentName) {
	class Decorated extends Component {
		constructor(props) {
			super(props);
			this.state = { loaded : false };
			this.constructor.displayName = `Wrapped${componentName}`;
		}

		componentDidMount() {
			this.setState({ loaded: true });
			this.ClientComponent = require('react-leaflet')[componentName];
		}

		render() {
			if (!this.state.loaded) return null;

			const { ClientComponent } = this;
			const { children, leafletRef, ...rest } = this.props;

			return <ClientComponent {...rest} ref={leafletRef}>{children}</ClientComponent>;
		}
	}

	Decorated.propTypes = {
		children: node,
		leafletRef: func
	};

	return Decorated;
}
