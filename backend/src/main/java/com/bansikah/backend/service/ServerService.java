package com.bansikah.backend.service;



import com.bansikah.backend.model.*;
import com.bansikah.backend.repository.ServerRepository;
import com.bansikah.backend.model.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;
import java.util.List;
import java.util.Optional;

@Service
public class ServerService {

    @Autowired
    private ServerRepository serverRepository;

    public List<Server> getAllServers() {
        return serverRepository.findAll();
    }

    public Server addServer(Server server) {
        server.setStatus(ServerStatus.PENDING);
        return serverRepository.save(server);
    }

    public Optional<Server> updateServer(Long id, Server updatedServer) {
        return serverRepository.findById(id).map(server -> {
            server.setName(updatedServer.getName());
            server.setIpAddress(updatedServer.getIpAddress());
            return serverRepository.save(server);
        });
    }

    public void deleteServer(Long id) {
        serverRepository.deleteById(id);
    }

    public Optional<Server> pingServer(Long id) {
        return serverRepository.findById(id).map(server -> {
            try {
                server.setStatus(ServerStatus.PENDING);
                serverRepository.save(server);

                InetAddress address = InetAddress.getByName(server.getIpAddress());
                boolean reachable = address.isReachable(5000); // 5-second timeout
                server.setStatus(reachable ? ServerStatus.UP : ServerStatus.DOWN);
            } catch (IOException e) {
                server.setStatus(ServerStatus.DOWN);
            }
            return serverRepository.save(server);
        });
    }
}