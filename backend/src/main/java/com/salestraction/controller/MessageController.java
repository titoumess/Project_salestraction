package com.salestraction.controller;

import com.salestraction.model.Message;
import com.salestraction.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Integer id) {
        Optional<Message> message = messageService.getMessageById(id);
        return message.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/match/{id_match}")
    public List<Message> getMessagesByIdMatch(@PathVariable Integer idMatch) {
        return messageService.getMessagesByIdMatch(idMatch);
    }

    @GetMapping("/sender/{id_sender}")
    public List<Message> getMessagesByIdSender(@PathVariable Integer idSender) {
        return messageService.getMessagesByIdSender(idSender);
    }

    @GetMapping("/receiver/{id_receiver}")
    public List<Message> getMessagesByIdReceiver(@PathVariable Integer idReceiver) {
        return messageService.getMessagesByIdReceiver(idReceiver);
    }

    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Integer id) {
        if (messageService.getMessageById(id).isPresent()) {
            messageService.deleteMessage(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}