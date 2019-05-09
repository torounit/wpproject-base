import { getBlockTypes, unregisterBlockType } from '@wordpress/blocks';
import blackListBlocks from './blackListBlocks';

/**
 * @type {Promise}
 */
const { _wpLoadBlockEditor } = window;
_wpLoadBlockEditor.then( () => {
	getBlockTypes().forEach( function( blockType ) {
		if ( blackListBlocks.includes( blockType.name ) ) {
			unregisterBlockType( blockType.name );
		}
	} );
} );

