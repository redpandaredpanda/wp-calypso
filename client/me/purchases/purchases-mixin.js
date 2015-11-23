/**
 * External Dependencies
 */
import page from 'page';

/**
 * Internal Dependencies
 */
import analytics from 'analytics';
import paths from './paths';

export default {
	componentWillMount() {
		if ( this.isDataLoading() ) {
			return;
		}

		const purchase = this.getPurchase();
		this.recordPageView( purchase );
	},

	componentWillReceiveProps( nextProps ) {
		// Return if the purchases haven't loaded yet
		if ( ! nextProps.selectedPurchase.hasLoadedFromServer ) {
			return;
		}

		// Return if the purchases have already been loaded into the props
		if ( this.props.selectedPurchase.data && nextProps.selectedPurchase.data.id === this.props.selectedPurchase.data.id ) {
			return;
		}

		// We should only reach this part of the code whenever list of purchases changes
		// which will only be once per session
		const purchase = nextProps.selectedPurchase.data;
		this.recordPageView( purchase );
	},

	recordPageView( purchase ) {
		if ( this.props.trackingSlug ) {
			analytics.tracks.recordEvent(
				`calypso_${ this.props.trackingSlug }_purchase_view`,
						{ product_slug: purchase.productSlug }
			);
		}
	},

	getPurchase() {
		return this.props.selectedPurchase.data;
	},

	goToList() {
		page( paths.list() );
	},

	goToEditCardDetails() {
		const { domain, id, payment: { creditCard } } = this.getPurchase();

		page( paths.editCardDetails( domain, id, creditCard.id ) );
	},

	goToEditPaymentMethod() {
		const { domain, id } = this.getPurchase();

		page( paths.editPaymentMethod( domain, id ) );
	},

	goToManagePurchase() {
		const { domain, id } = this.getPurchase();

		page( paths.managePurchase( domain, id ) );
	},

	isDataLoading() {
		return ( ! this.props.selectedSite || ! this.props.selectedPurchase.hasLoadedFromServer );
	}
};
