package fstg.irisi.miniFb.services;

import fstg.irisi.miniFb.domain.command.CommentCommand;
import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.CommentMapper;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.Comment;
import fstg.irisi.miniFb.domain.repositories.CommentRepository;
import fstg.irisi.miniFb.domain.representations.CommentRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final PostMapper postMapper;

    public List<CommentRepresentation> getAll() {
        return commentMapper.convertToCommentRepresentationList(commentRepository.findAll());
    }

    public List<CommentRepresentation> getCommentsByPostId(int postId) {
        return commentMapper.convertToCommentRepresentationList(commentRepository.findByPostId(postId));
    }


    public int create(CommentCommand commentCommand) {
        String body = commentCommand.getBody();
        UserCommand userCommand = commentCommand.getUser();
        PostCommand postCommand = commentCommand.getPost();

        Comment comment = new Comment();
        comment.setCommentBody(body);
        comment.setCommentOwner(userMapper.convertToUser(userCommand));
        comment.setCommentPost(postMapper.convertToPost(postCommand));

        commentRepository.save(comment);
        return comment.getCommentId();
    }

    public CommentRepresentation update(CommentCommand commentCommand) {
        Comment comment = commentRepository.findById(commentCommand.getId())
                .orElseThrow(() -> new IllegalArgumentException("comment.not.found with id" + commentCommand.getId()));

        comment.setCommentBody(commentCommand.getBody());
        comment.setCommentOwner(userMapper.convertToUser(commentCommand.getUser()));
        comment.setCommentPost(postMapper.convertToPost(commentCommand.getPost()));
        commentRepository.save(comment);
        return commentMapper.convertToCommentRepresentation(comment);
    }

    public String delete(int id) {
        if (id != 0) {
            commentRepository.deleteById(id);
        }
        return "Comment deleted!";
    }
}
