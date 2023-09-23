package fstg.irisi.miniFb.servicesTest;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.repositories.PostRepository;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import fstg.irisi.miniFb.services.PostService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PostServiceTest {
    @Mock
    private PostRepository postRepository;
    @Mock
    private  PostMapper postMapper;
    @InjectMocks
    private PostService postService;
    @Mock
    private UserMapper userMapper;

    @Test
    public void shouldGetAllPosts(){
        List<Post> posts = new ArrayList<>();
        Post post1 = new Post();
        post1.setPostId(1);
        post1.setPostBody("Post 1");
        posts.add(post1);

        Post post2 = new Post();
        post2.setPostId(2);
        post2.setPostBody("Post 2");
        posts.add(post2);

        List<PostRepresentation> postRepresentationList = new ArrayList<>();
        PostRepresentation postRepresentation1 = new PostRepresentation();
        postRepresentation1.setBody("Post 1");
        postRepresentation1.setId(1);
        postRepresentationList.add(postRepresentation1);

        PostRepresentation postRepresentation2 = new PostRepresentation();
        postRepresentation2.setBody("Post 2");
        postRepresentation2.setId(2);
        postRepresentationList.add(postRepresentation2);

         when(postRepository.findAll()).thenReturn(posts);
        when(postMapper.convertToPostRepresentationList(posts)).thenReturn(postRepresentationList);

        List<PostRepresentation> postRepresentationsResult = postService.getAll();
        verify(postRepository).findAll();
        verify(postMapper).convertToPostRepresentationList(posts);

        assertEquals(2, postRepresentationsResult.size());
        assertEquals(postRepresentationList,postRepresentationsResult);

    }
    @Test
    public void shouldCreatePost(){
        PostCommand command = new PostCommand();
        UserCommand userCommand = new UserCommand();
        userCommand.setName("test user");
        command.setBody("hello");
        command.setUser(userCommand);

        byte[] photo = new byte[]{1, 2, 3};
        FBUser fbUser = new FBUser();
        fbUser.setUserName("test user");
        when(userMapper.convertToUser(userCommand)).thenReturn(fbUser);

        Post expectedPost = new Post();
        expectedPost.setPostBody("hello");
        expectedPost.setPostOwner(fbUser);
        expectedPost.setPostPhoto(photo);

        when(postRepository.save(any(Post.class))).thenReturn(expectedPost);
        int createdPostID = postService.create(command);
        verify(userMapper).convertToUser(userCommand);
        verify(postRepository).save(any(Post.class));
        assertEquals(expectedPost.getPostId(), createdPostID);
    }
    @Test
    public void shouldUpdatePost(){
        int postIdToUpdate = 123;

        PostCommand postCommand = new PostCommand();
        postCommand.setId(postIdToUpdate);
        postCommand.setBody("Updated Body");

        UserCommand userCommand = new UserCommand();
        userCommand.setName("Updated User");
        postCommand.setUser(userCommand);

        byte[] updatedPhoto = new byte[]{4, 5, 6};
        postCommand.setPhoto(updatedPhoto);

        Post existingPost = new Post();
        existingPost.setPostId(postIdToUpdate);
        existingPost.setPostBody("Old Body");
        FBUser existingUser = new FBUser();
        existingUser.setUserName("Old User");
        existingPost.setPostOwner(existingUser);

        when(postRepository.findById(postIdToUpdate)).thenReturn(Optional.of(existingPost));


        FBUser updatedUser = new FBUser();
        updatedUser.setUserName("Updated User");
        when(userMapper.convertToUser(userCommand)).thenReturn(updatedUser);

        PostRepresentation updatedPostRepresentation = new PostRepresentation();
        updatedPostRepresentation.setBody("Updated Body");
        updatedPostRepresentation.setUser(userMapper.convertToUserRepresentation(updatedUser));
        updatedPostRepresentation.setPhoto(updatedPhoto);
        when(postMapper.convertToPostRepresentation(existingPost)).thenReturn(updatedPostRepresentation);
        PostRepresentation result = postService.update(postCommand);
        verify(postRepository).save(existingPost);
        assertEquals("Updated Body", result.getBody());
        assertEquals(updatedPhoto, result.getPhoto());

    }
    @Test
    public void shouldDeletePost(){
        int postIdToDelete = 123;
        String result = postService.delete(postIdToDelete);
        verify(postRepository).deleteById(postIdToDelete);
        assertEquals("post deleted!", result);
    }
}
