package fstg.irisi.miniFb.servicesTest;

import fstg.irisi.miniFb.domain.command.CommentCommand;
import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.CommentMapper;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.Comment;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.repositories.CommentRepository;
import fstg.irisi.miniFb.domain.representations.CommentRepresentation;
import fstg.irisi.miniFb.services.CommentService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@SpringBootTest
public class CommentServiceTest {
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private CommentMapper commentMapper;
    @Mock
    private UserMapper userMapper;
    @Mock
    private PostMapper postMapper;
    @InjectMocks
    private CommentService commentService;

    @Test
    public void shouldGetAllComments() {
        List<Comment> comments = new ArrayList<>();
        Comment comment1 = new Comment();
        comment1.setCommentId(1);
        comment1.setCommentBody("Comment 1");
        comments.add(comment1);

        Comment comment2 = new Comment();
        comment2.setCommentId(2);
        comment2.setCommentBody("Comment 2");
        comments.add(comment2);

        List<CommentRepresentation> commentRepresentationList = new ArrayList<>();
        CommentRepresentation commentRepresentation1 = new CommentRepresentation();
        commentRepresentation1.setBody("Comment 1");
        commentRepresentation1.setId(1);
        commentRepresentationList.add(commentRepresentation1);

        CommentRepresentation commentRepresentation2 = new CommentRepresentation();
        commentRepresentation2.setBody("Comment 2");
        commentRepresentation2.setId(2);
        commentRepresentationList.add(commentRepresentation2);

        when(commentRepository.findAll()).thenReturn(comments);
        when(commentMapper.convertToCommentRepresentationList(comments)).thenReturn(commentRepresentationList);

        List<CommentRepresentation> commentRepresentationsResult = commentService.getAll();
        verify(commentRepository).findAll();
        verify(commentMapper).convertToCommentRepresentationList(comments);

        assertEquals(2, commentRepresentationsResult.size());
        assertEquals(commentRepresentationList, commentRepresentationsResult);
    }

    @Test
    public void shouldDeleteComment() {
        int commentId = 123;
        String result = commentService.delete(commentId);
        verify(commentRepository).deleteById(commentId);
        assertEquals("Comment deleted!", result);
    }

    @Test
    public void shouldGetCommentsByPostId() {
        int postId = 1;
        List<Comment> comments = new ArrayList<>();
        List<CommentRepresentation> commentRepresentationList = new ArrayList<>();
        when(commentRepository.findByPostId(postId)).thenReturn(comments);
        when(commentMapper.convertToCommentRepresentationList(comments)).thenReturn(commentRepresentationList);

        List<CommentRepresentation> result = commentService.getCommentsByPostId(postId);

        verify(commentRepository).findByPostId(postId);
        verify(commentMapper).convertToCommentRepresentationList(comments);

        assertEquals(commentRepresentationList, result);
    }

    @Test
    public void shouldCreateComment() {
        CommentCommand command = new CommentCommand();
        UserCommand userCommand = new UserCommand();
        userCommand.setName("test user");
        command.setBody("hello");
        command.setUser(userCommand);

        PostCommand postCommand = new PostCommand();
        command.setPost(postCommand);

        Post post = new Post();

        FBUser fbUser = new FBUser();
        fbUser.setUserName("test user");
        when(userMapper.convertToUser(userCommand)).thenReturn(fbUser);
        when(postMapper.convertToPost(postCommand)).thenReturn(post);

        Comment expectedComment = new Comment();
        expectedComment.setCommentBody("hello");
        expectedComment.setCommentOwner(fbUser);
        expectedComment.setCommentPost(post);

        when(commentRepository.save(any(Comment.class))).thenReturn(expectedComment);
        int createdCommentID = commentService.create(command);
        verify(userMapper).convertToUser(userCommand);
        verify(postMapper).convertToPost(postCommand);
        verify(commentRepository).save(any(Comment.class));
        assertEquals(expectedComment.getCommentId(), createdCommentID);
    }

    @Test
    public void shouldUpdateComment() {
        int commentIdToUpdate = 123;

        CommentCommand commentCommand = new CommentCommand();
        commentCommand.setId(commentIdToUpdate);
        commentCommand.setBody("Updated Body");

        UserCommand userCommand = new UserCommand();
        userCommand.setName("Updated User");
        commentCommand.setUser(userCommand);

        Comment existingComment = new Comment();
        existingComment.setCommentId(commentIdToUpdate);
        existingComment.setCommentBody("Old Body");


        when(commentRepository.findById(commentIdToUpdate)).thenReturn(Optional.of(existingComment));

        FBUser updatedUser = new FBUser();
        updatedUser.setUserName("Updated User");

        when(userMapper.convertToUser(commentCommand.getUser())).thenReturn(updatedUser);

        CommentRepresentation updatedCommentRepresentation = new CommentRepresentation();
        updatedCommentRepresentation.setBody("Updated Body");
        updatedCommentRepresentation.setUser(userMapper.convertToUserRepresentation(updatedUser));

        when(commentMapper.convertToCommentRepresentation(existingComment)).thenReturn(updatedCommentRepresentation);
        CommentRepresentation result = commentService.update(commentCommand);
        verify(commentRepository).save(existingComment);
        assertEquals("Updated Body", result.getBody());

    }

}

