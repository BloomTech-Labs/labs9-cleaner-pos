import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Accordion from './Accordion';

const preload = {
	"children": [
		{
			"title": "Example1",
			"content": "something here"
		},
		{
			"title": "Example2",
			"content": "something different"
		}
	]
}
	

const Example = () => {
  return (
	<div>
    	<Accordion child = {preload} />
	</div>
  )
};

export default Example;
