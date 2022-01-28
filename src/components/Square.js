import React, { useState } from 'react';
import '../index.css';

export default function Square({value, onClick}) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}