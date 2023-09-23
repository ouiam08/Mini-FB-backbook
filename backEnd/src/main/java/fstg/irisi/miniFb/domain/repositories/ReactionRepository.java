package fstg.irisi.miniFb.domain.repositories;

import fstg.irisi.miniFb.domain.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository

public interface ReactionRepository extends JpaRepository<Reaction,Integer> {
    @Query("SELECT r FROM Reaction r WHERE r.postReaction.postId = :postId")
    List<Reaction> findReactionByPostId(int postId);
}
