package ca.csfoy.investmentSaladApi.infra.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<UserEntity, String> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = ?1")
    Optional<UserEntity> findByEmail(String email);
    
}
