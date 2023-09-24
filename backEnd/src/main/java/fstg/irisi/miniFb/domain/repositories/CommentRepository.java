package fstg.irisi.miniFb.domain.repositories;

import fstg.irisi.miniFb.domain.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("SELECT c FROM Comment c WHERE c.commentPost.postId = :postId")
    List<Comment> findByPostId(int postId);

}
