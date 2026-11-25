// The account page builds on the checkout layout; these rules add the order
// history, one card per order.
export const accountStyles = ` .ac {
	 max-width: 760px;
	 margin: 0 auto;
}
 .ac-header {
	 display: grid;
	 justify-items: start;
	 gap: 12px;
	 margin-bottom: 48px;
}
 .ac-header h1 {
	 margin: 0;
}
 .ac-header p {
	 margin: 0;
	 color: var(--rx-muted);
	 font-size: 17px;
}
 .ac-header strong {
	 color: var(--rx-ink);
	 font-weight: 600;
}
 .ac .ac-demo {
	 font-size: 14px;
}
 .ac h2 {
	 margin-bottom: 16px;
}
 .ac-orders {
	 display: grid;
	 gap: 12px;
	 margin: 0;
	 padding: 0;
	 list-style: none;
}
 .ac-order {
	 display: grid;
	 gap: 14px;
	 padding: 20px;
	 border: 1px solid var(--rx-line);
	 border-radius: var(--rx-radius-card);
	 /* A whole card is the link, so it keeps the text colour, not the link colour. */
	 color: var(--rx-ink) !important;
	 text-decoration: none;
	 transition: border-color 200ms ease, box-shadow 200ms ease;
}
 @media (hover: hover) and (pointer: fine) {
	 .ac-order:hover {
		 border-color: transparent;
		 box-shadow: var(--rx-card-shadow-hover);
	}
}
 .ac-order:focus-visible {
	 outline: 2px solid var(--rx-link);
	 outline-offset: 2px;
}
 .ac-order-head {
	 display: flex;
	 flex-wrap: wrap;
	 align-items: center;
	 gap: 6px 12px;
	 font-size: 15px;
}
 .ac-order-head > span:not(.cp-status) {
	 color: var(--rx-muted);
}
 .ac-order-head .cp-status {
	 margin-left: auto;
}
 .ac-order .cp-status[data-status=paid] {
	 background: #e6f4ea;
	 color: #1e6b34;
}
 .ac-order .cp-status[data-status=cancelled] {
	 background: var(--rx-gray);
	 color: var(--rx-muted);
}
 .ac-order-body {
	 display: grid;
	 grid-template-columns: auto 1fr auto;
	 align-items: center;
	 gap: 16px;
}
 .ac-order-thumbs {
	 display: flex;
}
 .ac-order-thumbs .cp-thumb {
	 background: var(--rx-gray);
}
 .ac-order-thumbs .cp-thumb + .cp-thumb {
	 margin-left: -16px;
	 box-shadow: -2px 0 0 #fff;
}
 .ac-order-items {
	 display: grid;
	 gap: 2px;
	 min-width: 0;
	 font-size: 15px;
	 font-weight: 600;
}
 .ac-order-items > span {
	 color: var(--rx-muted);
	 font-size: 13px;
	 font-weight: 400;
}
 .ac-order-arrow {
	 color: var(--rx-muted);
}
 @media (max-width: 480px) {
	 .ac-order-body {
		 gap: 12px;
	}
	 .ac-order-thumbs .cp-thumb {
		 width: 44px;
		 height: 44px;
	}
	 .ac-order-thumbs .cp-thumb svg {
		 width: 36px;
		 height: 36px;
	}
	 .ac-order-thumbs .cp-thumb + .cp-thumb {
		 margin-left: -12px;
	}
}
 .ac-note {
	 display: grid;
	 justify-items: start;
	 gap: 16px;
	 color: var(--rx-muted);
	 font-size: 17px;
}
 .ac-note p {
	 margin: 0;
}
 .ac-note[role=status] {
	 display: flex;
	 align-items: center;
}
 `;
