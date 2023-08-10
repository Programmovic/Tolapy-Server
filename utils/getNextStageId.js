const Stage = require('../models/stage');
// =============================================================================
// // Helper function to get the next ID for a stage
// =============================================================================
module.exports = async function getNextStageId() {
    const lastStage = await Stage.findOne().sort({ id: -1 });
    if (!lastStage) {
        return 1;
    }
    return lastStage.id + 1;
}