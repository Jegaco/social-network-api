const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThoughtById,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;