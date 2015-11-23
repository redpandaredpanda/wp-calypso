/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import analytics from 'analytics';

const CancelPurchaseSupportBox = React.createClass( {
	propTypes: {
		purchase: React.PropTypes.object.isRequired,
	},

	trackClickContactSupprt() {
		if ( ! this.props.purchase ) {
			return;
		}

		analytics.tracks.recordEvent(
			'calypso_purchases_click_contact_support',
			{ product_type: this.props.purchase.productSlug }
		);
	},

	render() {
		const contactSupportUrl = 'https://support.wordpress.com/';

		return (
			<div className="cancel-purchase-support-box">
				<h3>
					{ this.translate( 'Have questions?' ) }
					<br />
					{ this.translate( 'We\'re here to help!' ) }
				</h3>

				<p>
					{ this.translate(
						'If you are unsure about canceling or have any questions about this purchase, please {{a}}contact support{{/a}}.',
						{
							components: {
								a: <a href={ contactSupportUrl } target="_blank" onClick={ this.trackClickContactSupprt } />
							}
						}
					) }
				</p>

				<a href={ contactSupportUrl }
					target="_blank"
					onClick={ this.trackClickContactSupprt }
					className="button is-primary">
					{ this.translate( 'Contact Support' ) }
				</a>
			</div>
		);
	}
} );

export default CancelPurchaseSupportBox;
