package com.salestraction.repository;

import com.salestraction.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByIdMatch(Integer idMatch);
    List<Message> findByIdSender(Integer idSender);
    List<Message> findByIdReceiver(Integer idReceiver);
}