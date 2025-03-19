package com.bansikah.backend.controller;

import com.bansikah.backend.model.Server;
import com.bansikah.backend.service.ServerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servers")
public class ServerController {
    private static final Logger logger = LoggerFactory.getLogger(ServerController.class);

    @Autowired
    private ServerService serverService;

    @GetMapping
    public ResponseEntity<List<Server>> getAllServers() {
        try {
            logger.debug("Fetching all servers");
            List<Server> servers = serverService.getAllServers();
            return ResponseEntity.ok(servers);
        } catch (Exception e) {
            logger.error("Failed to fetch servers: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Server> addServer(@RequestBody Server server) {
        try {
            logger.debug("Adding server: {}", server);
            Server savedServer = serverService.addServer(server);
            return ResponseEntity.ok(savedServer);
        } catch (Exception e) {
            logger.error("Failed to add server: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Server> updateServer(@PathVariable Long id, @RequestBody Server server) {
        try {
            logger.debug("Updating server with id {}: {}", id, server);
            return serverService.updateServer(id, server)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Failed to update server {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServer(@PathVariable Long id) {
        try {
            logger.debug("Deleting server with id {}", id);
            serverService.deleteServer(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Failed to delete server {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/ping")
    public ResponseEntity<Server> pingServer(@PathVariable Long id) {
        try {
            logger.debug("Pinging server with id {}", id);
            return serverService.pingServer(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Failed to ping server {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}