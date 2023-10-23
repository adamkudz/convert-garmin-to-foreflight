export function getWaypointInfo(flight, offIndex, onIndex) {
	let wpts = [];
	let wpt = {};
	let routeString = '';
	let rows = flight
		.map((row) => row.atvwpt)
		.filter((r) => {
			if (
				r !== undefined &&
				r !== null &&
				!r.includes('00') &&
				!r.includes('-1') &&
				!r.includes('_____') &&
				!r.includes('RW') &&
				!r.includes('GARMN')
			) {
				return r;
			}
		});
	let routeSet = new Set([...rows]);

	routeSet.forEach((set) => {
		wpt = {};

		let lastWpt = flight.findLast(function (r) {
			if (r.atvwpt === set) {
				return r;
			}
		});
		if (lastWpt.wptdst < 3) {
			wpt.positionName = set;
			wpt.positionInfo = lastWpt;
			routeString += `${set} `;
		} else {
			wpt.positionName = `${set}-${lastWpt.wptdst}nm`;
			// routeString += `${set}-${lastWpt.wptdst}nm `;
			wpt.positionInfo = lastWpt;
		}

		wpts.push(wpt);
	});
	routeString.replace('', `(${flight.from}) `);
	wpts.unshift({ positionName: 'flightOff', positionInfo: flight[offIndex] });
	wpts.push({ positionInfo: 'flightOn', positionName: flight[onIndex] });
	return { wpts, routeString };
}
