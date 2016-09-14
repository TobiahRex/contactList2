'use strict';

$(() => {
  $('.create-contact').on('click', createContact)
  $('.all-contacts').on('click', '.edit-btn', watchEdit)
  $('.all-contacts').on('click', '.delete-btn', deleteContact)
})

let contacts = []

let createContact = (e) => {
  e.preventDefault()
  let newName = $('input.new-contact').val()
  let newNumber = $('input.new-contact-number').val()
  let newAddress = $('input.new-contact-address').val()
  let newImage = $('input.new-contact-image').val()
  $('input.new-contact').val('')
  $('input.new-contact-number').val('')
  $('input.new-contact-address').val('')
  $('input.new-contact-image').val('')
  let id = Date.now().toString()
  let created = new Date
  created = created.toString()
  let newContact = {
    id,
    created,
    name: newName,
    number: newNumber,
    address: newAddress,
    image: newImage
  }
  contacts.unshift(newContact)
  renderContacts()
}

let deleteContact = (e) => {
  let deleteId = e.toElement.parentElement.parentElement.parentElement.attributes.id.value;
  contacts = contacts.filter((contact) => {
    return contact.id !== deleteId
  })
  renderContacts()
}

let watchEdit = () => {
  let editId = event.toElement.parentElement.parentElement.parentElement.attributes.id.value;
  let thisContact
  contacts.forEach((contact) => { if (contact.id === editId) thisContact = contact })
  $('div').find("[id='" + editId + "']").find('.contact-row').addClass('hidden')
  $('div').find("[id='" + editId + "']").find('.edit-row').removeClass('hidden')

  let $editName = $('div').find("[id='" + editId + "']").find('.template-edit-name')
  let $editNumber = $('div').find("[id='" + editId + "']").find('.template-edit-number')
  let $editAddress = $('div').find("[id='" + editId + "']").find('.template-edit-address')
  let $editImage = $('div').find("[id='" + editId + "']").find('.template-edit-image')

  $editName.val(thisContact.name || '')
  $editNumber.val(thisContact.number || '')
  $editAddress.val(thisContact.address || '')
  $editImage.val(thisContact.image ||'')

  $('.save-btn').on('click', saveEdit)
  $('.cancel-btn').on('click', cancelEdit)
}

let saveEdit = () => {
  let editId = event.toElement.parentElement.parentElement.parentElement.parentElement.attributes.id.value;
  let thisContact
  contacts.forEach((contact) => { if (contact.id === editId) thisContact = contact })
  let $updatedName = $('div').find("[id='" + editId + "']").find('.template-edit-name').val()
  let $updatedNumber = $('div').find("[id='" + editId + "']").find('.template-edit-number').val()
  let $updatedAddress = $('div').find("[id='" + editId + "']").find('.template-edit-address').val()
  let $updatedImage = $('div').find("[id='" + editId + "']").find('.template-edit-image').val()
  thisContact.name = $updatedName
  thisContact.number = $updatedNumber
  thisContact.address = $updatedAddress
  thisContact.image = $updatedImage
  renderContacts()
}

let cancelEdit = () => {
  let editId = event.toElement.parentElement.parentElement.parentElement.parentElement.attributes.id.value;
  let $updatedName = $('div').find("[id='" + editId + "']").find('.template-edit-name').val('')
  let $updatedNumber = $('div').find("[id='" + editId + "']").find('.template-edit-number').val('')
  let $updatedAddress = $('div').find("[id='" + editId + "']").find('.template-edit-address').val('')
  let $updatedImage = $('div').find("[id='" + editId + "']").find('.template-edit-image').val('')
  $('div').find("[id='" + editId + "']").find('.edit-row').addClass('hidden')
  $('div').find("[id='" + editId + "']").find('.contact-row').removeClass('hidden')
}

let renderContacts = () => {
  $('.append-here').empty()
  contacts.forEach((contact) => {
    let $newContact = $('div.template').clone()
    $newContact.removeClass('template hidden').addClass('new-contact').attr('id', contact.id)
    $newContact.find('.template-contact-name').removeClass('template-contact-name').addClass('contact-name').text(contact.name)
    $newContact.find('.template-date').removeClass('template-date').addClass('contact-added').text(contact.created.slice(0, 24))
    $newContact.find('.template-contact-number').removeClass('template-contact-number').addClass('contact-number').text(contact.number)
    $newContact.find('.template-contact-address').removeClass('template-contact-address').addClass('contact-address').text(contact.address)
    $newContact.find('.template-contact-image').removeClass('template-contact-image').addClass('contact-image').attr('src', contact.image)
    $('div.append-here').append($newContact)
  })
}
