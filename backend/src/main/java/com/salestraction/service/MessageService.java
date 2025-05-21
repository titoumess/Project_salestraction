package com.salestraction.service;

import com.salestraction.model.Message;
import com.salestraction.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Integer id) {
        return messageRepository.findById(id);
    }

    public List<Message> getMessagesByIdMatch(Integer idMatch) {
        return messageRepository.findByIdMatch(idMatch);
    }

    public List<Message> getMessagesByIdSender(Integer idSender) {
        return messageRepository.findByIdSender(idSender);
    }

    public List<Message> getMessagesByIdReceiver(Integer idReceiver) {
        return messageRepository.findByIdReceiver(idReceiver);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(Integer id) {
        messageRepository.deleteById(id);
    }
}