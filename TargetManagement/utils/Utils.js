import Priority from '../models/Priority.js';

export default class Utils {

    static getPriorityText(priority) {
        let result = null;
        switch (priority) {
        case Priority.High:
            result = "High";
            break;
        case Priority.Med:
            result = "Medium";
            break;
        case Priority.Low:
            result = "Low";
            break;
        }
        return result;
    }

    static getPriorityFromText(priority) {
        let result = null;
        switch (priority) {
        case "High":
            result = Priority.High;
            break;
        case "Medium":
            result = Priority.Med;
            break;
        case "Low":
            result = Priority.Low;
            break;
        }
        return result;
    }
}

