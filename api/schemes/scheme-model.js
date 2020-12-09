// scheme-model
const db = require('../../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(query){
    let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
    const offset = limit * (page - 1);
  
    let rows = db('schemes')
      .orderBy(sortby, sortdir)
      .limit(limit)
      .offset(offset);
  
    return rows;
}

function findById(id){
    return db('schemes')
        .where({ id })
        .first()
}

function findSteps(id){
    return db('schemes as s')
        .join('steps as st', 's.id', 'st.scheme_id')
        .select('st.id', 'scheme_name', 'step_number', 'instructions')
        .where('s.id', id)
        .orderBy('step_number')
}

async function add(scheme){
    const [id] = await db('schemes').insert(scheme)
    return findById(id) 
}

function update(changes, id){
    return db('schemes')
        .where({ id })
        .update(changes, '*')
}

function remove(id){
    return db('schemes')
        .where({ id })
        .del()
}