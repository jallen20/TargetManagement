import Data from './../Data.js';
import Target from './../models/Target.js';

export default function TargetController(targetList_) {
        if (!targetList_) {
            throw Error(`Error setting target list: ${targetList_}`);
        }

    var targetList = targetList_;
    var idCounter = targetList.targets.length > 0 ? targetList.targets[targetList.targets.length - 1].id.value : 0;
    this.targets = targetList.targets;
    idCounter++;

    this.add = (name_, description_, priority_) => {
        let target_ = new Target(idCounter, name_, description_, priority_);
        targetList.add(target_);
        Data.push(target_);
        idCounter++;
    };

    this.edit = (id_, destTarget) => {
        targetList.edit(id_, destTarget);
        for (let i = 0; i < Data.length; i++) {
            if (Data[i].id.value === id_) {
                Data[i] = new Target(destTarget.id.value, destTarget.name, destTarget.description, destTarget.priority);
            }
        }
    };

    this.delete = (id) => {
        targetList.delete(id);
        for (let i = 0; i < this.targets.length; i++) {
            if (this.targets[i].id.value === id) {
                Data.splice(i, 1);
            }
        }
    };

    this.search = (val) => {
        return val ? this.targets.filter(target => target.name.toLocaleUpperCase().indexOf(val.toLocaleUpperCase()) !== -1) : this.targets;
    };
}