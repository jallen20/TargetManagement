import TargetListView from './view_models/TargetListView.jsx';
import TargetListBuilder from './io/TargetListBuilder.js';
import TargetController from './controllers/TargetController.js';
import ReactDOM from 'react-dom';
import React from 'react';

export const App = (function () {

    var start = function() {
        const renderTargetListView = function() {
            let targetListContainer = document.getElementById("targets-container");
            let targetList = TargetListBuilder.build();
            let controller = new TargetController(targetList);
            ReactDOM.render(<TargetListView Controller={controller}/>, targetListContainer);
        };
        renderTargetListView();

    };

    start();

}).call(this);

