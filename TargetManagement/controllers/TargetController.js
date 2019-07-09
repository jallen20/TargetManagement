import Data from './../Data.js';
import Target from './../models/Target.js';

export default function TargetController(targetList_) {
        if (!targetList_) {
            throw Error(`Error setting target list: ${targetList_}`);
        }

    var targetList = targetList_;
    var idCounter = targetList.targets[targetList.targets.length - 1].id.value;
    this.targets = targetList.targets;
    idCounter++;

    this.add = (name_, description_, priority_) => {
        let target_ = new Target(idCounter, name_, description_, priority_);
        targetList.add(target_);
        Data.push(target_);
        idCounter++;
    };

    this.delete = (target_) => {
        targetList.delete(target_);
        Data.splice(() => {
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].id.value === target.id.value) {
                        return i;
                    }
                }
            },
            1);
    };
}