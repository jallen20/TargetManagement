import Priority from './Priority.js';

function Target(id_, name_, description_, priority_) {

    if (!name_) {
        throw Error(`Error setting target name: ${name_}`);
    }
    if (!description_) {
        throw Error(`Error setting target description: ${description_}`);
    }
    if ([Priority.High, Priority.Med, Priority.Low].indexOf(priority_) === -1) {
        throw Error(`Error setting target priority: ${priority_}`);
    }
    this.id = {value: id_};
    Object.freeze(this.id);
    this.name = name_;
    this.description = description_;
    this.priority = priority_;
}

export default Target;