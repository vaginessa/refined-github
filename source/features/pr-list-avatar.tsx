import React from 'dom-chef';
import select from 'select-dom';
import * as pageDetect from 'github-url-detection';

import features from '.';
import getUserAvatar from '../github-helpers/get-user-avatar';

async function init(): Promise<void> {
	for (const author of select.all('.js-issue-row [data-hovercard-type="user"]')) {
		const src = getUserAvatar(author.textContent!.trim(), 16)!;

		const avatar = (
			<img
				className="avatar mr-2"
				src={src}
				style={transform: 'translate(-1.5px)'}
				width="16"
				height="16"
				alt={`@${author.textContent!.trim()}`}
			/>
		);
		author.prepend(avatar);
	}
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isRepoConversationList,
	],
	exclude: [
		() => select.exists('.blankslate'),
	],
	deduplicate: 'has-rgh-inner',
	init,
});
