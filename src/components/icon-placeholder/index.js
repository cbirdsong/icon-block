/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { bolt, boltPlaceholder } from './../../icons/bolt';
import { parseUploadedMediaAndSetIcon } from '../../utils';
import QuickInserterPopover from './../quick-inserter';

export default function IconPlaceholder( props ) {
	const {
		setInserterOpen,
		isQuickInserterOpen,
		setQuickInserterOpen,
		setCustomInserterOpen,
		attributes,
		setAttributes,
		enableCustomIcons,
		isSVGUploadAllowed,
	} = props;

	const instructions = () => {
		const messages = {
			default: __(
				'Choose an icon from the library, pick one from your media library, or insert a custom SVG graphic.',
				'icon-block'
			),
			noCustom: __(
				'Choose an icon from the library or pick one from your media library.',
				'icon-block'
			),
			noMediaLibrary: __(
				'Choose an icon from the library or insert a custom SVG graphic.',
				'icon-block'
			),
			noCustomNoMediaLibrary: __(
				'Browse the icon library and choose one to insert.',
				'icon-block'
			),
		};

		if ( ! enableCustomIcons && ! isSVGUploadAllowed ) {
			return messages.noCustomNoMediaLibrary;
		} else if ( ! enableCustomIcons ) {
			return messages.noCustom;
		} else if ( ! isSVGUploadAllowed ) {
			return messages.noMediaLibrary;
		}

		return messages.default;
	};

	return (
		<Placeholder
			className="has-illustration"
			icon={ bolt }
			label={ __( 'Icon', 'icon-block' ) }
			instructions={ instructions() }
		>
			<Icon
				className="components-placeholder__illustration"
				icon={ boltPlaceholder }
			/>
			<Button isPrimary onClick={ () => setQuickInserterOpen( true ) }>
				{ __( 'Icon Library', 'icon-block' ) }
			</Button>
			{ isSVGUploadAllowed && (
				<MediaUpload
					onSelect={ ( media ) =>
						parseUploadedMediaAndSetIcon(
							media,
							attributes,
							setAttributes
						)
					}
					allowedTypes={ [ 'image/svg+xml' ] }
					render={ ( { open } ) => (
						<Button isTertiary onClick={ open }>
							{ __( 'Open Media Library', 'icon-block' ) }
						</Button>
					) }
				/>
			) }
			{ enableCustomIcons && (
				<Button
					isTertiary
					onClick={ () => setCustomInserterOpen( true ) }
				>
					{ __( 'Insert custom SVG', 'icon-block' ) }
				</Button>
			) }
			<QuickInserterPopover
				setInserterOpen={ setInserterOpen }
				isQuickInserterOpen={ isQuickInserterOpen }
				setQuickInserterOpen={ setQuickInserterOpen }
				setAttributes={ setAttributes }
			/>
		</Placeholder>
	);
}
