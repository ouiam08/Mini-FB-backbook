package fstg.irisi.miniFb.domain.repositories;

import fstg.irisi.miniFb.domain.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}
