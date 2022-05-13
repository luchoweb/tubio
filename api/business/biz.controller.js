const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const businessService = require('./biz.service.js');

// routes
router.get('/@:username', getByUsername);

// prive routes
router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  businessService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  businessService.getById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function getByUsername(req, res, next) {
  businessService.getByUsername(req.params.username)
    .then(biz => res.json(biz))
    .catch(next);
}

function create(req, res, next) {
  businessService.create(req.body)
    .then(() => res.json({ message: 'User created' }))
    .catch(next);
}

function update(req, res, next) {
  businessService.update(req.params.id, req.body)
    .then(() => res.json({ message: 'User updated' }))
    .catch(next);
}

function _delete(req, res, next) {
  businessService.delete(req.params.id)
    .then(() => res.json({ message: 'User deleted' }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}