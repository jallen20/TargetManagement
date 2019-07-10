import Target from './Target.js';

export default function TargetList(list) {

    this.targets = list || new Array();


    this.add = (target_) => {
        if (!target_) {
            throw Error(`Cannot add target : ${target_}`);
        }
        this.targets.push(target_);
    };

    this.edit = (id_, destTarget) => {
        for (let i = 0; i < this.targets.length; i++) {
            if (this.targets[i].id.value === id_) {
                this.targets[i] = new Target(destTarget.id.value, destTarget.name, destTarget.description, destTarget.priority);
            }
        }
    };

    this.delete = (id) => {
        if (!id) {
            throw Error(`Cannot delete target id: ${id}`);
        }
        for (let i = 0; i < this.targets.length; i++) {
            if (this.targets[i].id.value === id) {
                this.targets.splice(i, 1);
            }
        }
    };

    this.search = (name_) => {
        return this.targets.filter(target_ => {
            return target_.name.indexOf(name_) !== -1;
        });
    };
}