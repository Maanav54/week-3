
package com.example.myapp.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
