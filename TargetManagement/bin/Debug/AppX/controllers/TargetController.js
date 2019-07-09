import Data from './../Data.js';

function TargetController(targetList_) {
        if (!targetList_) {
            throw Error(`Error setting target list: ${targetList_}`);
        }

    var targetList = targetList_;
    this.targets = targetList.targets;

    this.add = function(target_) {
        this.targetList.add(target_);
        Data.push(target_);
    };

    this.delete = function(target_) {
        this.targetList.delete(target_);
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

export default TargetController;