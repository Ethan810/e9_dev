
import PrjPortalStore from './project/ProjectStore';
import ProcessListStore from './project/ProcessListStore'
import PrjResourceStore from './project/PrjResourceStore'
import TaskExecuteStore from './task/TaskExecuteStore'
import taskCardStore from './task/taskCardStore'

import prjExecuteStore from './prjExecuteStore'

import testStore from './test'
import prjAddStore from './addStore'
import capital1Store from './capital1Store'
 
export default {
    testStore,
    prjAddStore,
    taskCardStore,
    prjExecuteStore,
    projectStore: new PrjPortalStore(),
	processListStore : new ProcessListStore(),
    prjResourceStore : new PrjResourceStore(),
    taskExecuteStore:new TaskExecuteStore(),
    capital1Store,
}  