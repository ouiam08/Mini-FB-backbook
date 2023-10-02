package fstg.irisi.miniFb.servicesTest;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.ReactionCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.ReactionMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.model.Reaction;
import fstg.irisi.miniFb.domain.repositories.ReactionRepository;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import fstg.irisi.miniFb.domain.representations.ReactionRepresentation;
import fstg.irisi.miniFb.services.ReactionService;
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
public class ReactionServiceTest {
    @InjectMocks
    private ReactionService reactionService;
    @Mock
    private ReactionRepository reactionRepository;
    @Mock
    private ReactionMapper reactionMapper;
    @Mock
    private UserMapper userMapper;
    @Mock
    private PostMapper postMapper;


    @Test
    public void shouldGetAllReactions(){
        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1);
        reaction1.setReactionType("Like");

        Reaction reaction2 = new Reaction();
        reaction1.setReactionId(2);
        reaction1.setReactionType("Love");

        List<Reaction> reactionList = new ArrayList<>();
        reactionList.add(reaction1);
        reactionList.add(reaction2);

        List<ReactionRepresentation> reactionRepresentationList = new ArrayList<>();
        ReactionRepresentation reactionRepresentation1 = new ReactionRepresentation();
        reactionRepresentation1.setId(1);
        reactionRepresentation1.setType("Like");
        reactionRepresentationList.add(reactionRepresentation1);

        ReactionRepresentation reactionRepresentation2 = new ReactionRepresentation();
        reactionRepresentation2.setId(2);
        reactionRepresentation2.setType("Love");
        reactionRepresentationList.add(reactionRepresentation2);

        when(reactionRepository.findAll()).thenReturn(reactionList);
        when(reactionMapper.convertToReactionRepresentationList(reactionList)).thenReturn(reactionRepresentationList);

        List<ReactionRepresentation> reactionRepresentationsResult = reactionService.getAll();
        verify(reactionRepository).findAll();
        verify(reactionMapper).convertToReactionRepresentationList(reactionList);

        assertEquals(2,reactionRepresentationsResult.size());
        assertEquals(reactionRepresentationList,reactionRepresentationsResult);

    }


    @Test
    public void shouldGetReactionsByPostId() {
        int postId = 1;
        List<Reaction> reactions = new ArrayList<>();
        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1);
        reaction1.setReactionType("Like");
        Post post = new Post();
        post.setPostId(postId);
        reaction1.setPostReaction(post);
        reactions.add(reaction1);

        Reaction reaction2 = new Reaction();
        reaction1.setReactionId(2);
        reaction1.setReactionType("Love");
        reaction1.setPostReaction(post);
        reactions.add(reaction2);

        List<ReactionRepresentation> reactionRepresentationList = new ArrayList<>();
        PostRepresentation postRepresentation = new PostRepresentation();
        postRepresentation.setId(postId);
        ReactionRepresentation reactionRepresentation1 = new ReactionRepresentation();
        reactionRepresentation1.setId(1);
        reactionRepresentation1.setPost(postRepresentation);
        reactionRepresentation1.setType("Like");
        reactionRepresentationList.add(reactionRepresentation1);
        ReactionRepresentation reactionRepresentation2 = new ReactionRepresentation();
        reactionRepresentation2.setId(1);
        reactionRepresentation2.setPost(postRepresentation);
        reactionRepresentation2.setType("Like");
        reactionRepresentationList.add(reactionRepresentation2);


        when(reactionRepository.findReactionByPostId(postId)).thenReturn(reactions);
        when(reactionMapper.convertToReactionRepresentationList(reactions)).thenReturn(reactionRepresentationList);

        List<ReactionRepresentation> result = reactionService.getByPostId(postId);

        verify(reactionRepository).findReactionByPostId(postId);
        verify(reactionMapper).convertToReactionRepresentationList(reactions);

        assertEquals(reactionRepresentationList, result);
    }

    @Test
    public void shouldCreateReaction() {
        ReactionCommand command = new ReactionCommand();
        UserCommand userCommand = new UserCommand();
        userCommand.setName("test user");
        command.setUser(userCommand);

        PostCommand postCommand = new PostCommand();
        command.setPost(postCommand);

        Post post = new Post();

        FBUser fbUser = new FBUser();
        fbUser.setUserName("test user");
        when(userMapper.convertToUser(userCommand)).thenReturn(fbUser);
        when(postMapper.convertToPost(postCommand)).thenReturn(post);

        Reaction expectedReaction = new Reaction();

        expectedReaction.setReactingUser(fbUser);
        expectedReaction.setPostReaction(post);

        when(reactionRepository.save(any(Reaction.class))).thenReturn(expectedReaction);
        int createdID = reactionService.create(command);
        verify(userMapper).convertToUser(userCommand);
        verify(postMapper).convertToPost(postCommand);
        verify(reactionRepository).save(any(Reaction.class));
        assertEquals(expectedReaction.getReactionId(), createdID);
    }

    @Test
    public void shouldUpdateReaction() {
        int reactionId = 1;
        ReactionCommand reactionCommand = new ReactionCommand();
        reactionCommand.setId(1);

        Reaction existingReaction = new Reaction();

        when(reactionRepository.findById(reactionId)).thenReturn(Optional.of(existingReaction));

        Reaction updatedReaction = new Reaction();
        when(reactionRepository.save(existingReaction)).thenReturn(updatedReaction);

        ReactionRepresentation updatedRepresentation = new ReactionRepresentation();
        when(reactionMapper.convertToReactionRepresentation(updatedReaction)).thenReturn(updatedRepresentation);

        ReactionRepresentation result = reactionService.update(reactionCommand);

        verify(reactionRepository).findById(reactionId);
        verify(reactionRepository).save(existingReaction);
        verify(reactionMapper).convertToReactionRepresentation(updatedReaction);

        assertEquals(updatedRepresentation,result);
    }
    @Test
    public void shouldDeleteReaction(){
        int reactionId = 1;
        String result = reactionService.delete(reactionId);
        verify(reactionRepository).deleteById(reactionId);
        assertEquals("Reaction deleted!", result);
    }
}
