import TargetListBuilder from './io/TargetListBuilder.js';
import TargetController from './controllers/TargetController.js';
import TargetForm from './components/TargetForm.jsx';
import Data from './Data.js';
import ReactDOM from 'react-dom';
import React from 'react';

export const App = (function () {

    var start = function () {

        const renderTargetForm = () => {
            let targetFormContainer = document.getElementById('target-form-container');
            let targetList = TargetListBuilder.build(Data);
            let controller = new TargetController(targetList);
            ReactDOM.render(<TargetForm Controller={controller} />, targetFormContainer);
        };

        renderTargetForm();
       window.addEventListener("click", () => {
           if (window.flyoutOpen) {
               window.flyoutOpen = false;
               let flyout = document.getElementById("flyout-container");
               flyout.parentElement.removeChild(flyout);
           }
       });
    };

    start();

}).call(this);

