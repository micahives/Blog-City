document.addEventListener('DOMContentLoaded', function () {

  const postId = window.postId || null;

    function openDeleteModal() {
      const modal = document.getElementById('deleteConfirmationModal');
      modal.classList.remove('hidden');
    }
  
    function closeDeleteModal() {
      const modal = document.getElementById('deleteConfirmationModal');
      modal.classList.add('hidden');
    }
  
    const deleteButton = document.getElementById('deleteButton');
  
    if (deleteButton) {
      deleteButton.addEventListener('click', function () {
        openDeleteModal();
      });
    }
  
    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
      closeDeleteModal();
  
      const postId = document.getElementById('blogPostId').value;
  
      fetch(`/dashboard/blog-post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message);
  
          const confirmationMessage = document.getElementById('confirmationMessage');
          confirmationMessage.innerText = 'Blog post deleted successfully!';
          confirmationMessage.classList.remove('hidden');
  
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Error deleting blog post:', error.message);
        });
    });
  
    document.getElementById('cancelDeleteButton').addEventListener('click', function () {
      closeDeleteModal();
    });
  
    const editButton = document.getElementById('editButton');
    const editFields = document.getElementById('editFields');
    const cancelEditButton = document.getElementById('cancelEditButton');
  
    if (editButton) {
      editButton.addEventListener('click', function () {
        // Show the edit fields
        editFields.classList.remove('hidden');
      });
    }
  
    if (cancelEditButton) {
      cancelEditButton.addEventListener('click', function () {
        // Hide the edit fields
        editFields.classList.add('hidden');
      });
    }
  
    const saveChangesButton = document.getElementById('saveChangesButton');
  
    if (saveChangesButton) {
      saveChangesButton.addEventListener('click', async function () {
        const updatedTitle = document.getElementById('editTitle').value;
        const updatedSummary = document.getElementById('editSummary').value;
        const postId = document.getElementById('blogPostId').value;
  
        try {
          const response = await fetch(`/dashboard/blog-post/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle, summary: updatedSummary }),
          });
  
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Error updating blog post:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating blog post:', error.message);
        }
      });
    }
  
    // Comment submission code
    const submitCommentButton = document.getElementById('submitCommentButton');
    const commentText = document.getElementById('commentText');
  
    if (submitCommentButton) {
      submitCommentButton.addEventListener('click', async function () {
        const postId = document.getElementById('blogPostId').value;
        const commentContent = commentText.value;
  
        try {
          const response = await fetch(`/dashboard/blog-post/${postId}/comment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ summary: commentContent }),
          });
  
          const responseData = await response.json();
  
          if (response.ok) {
            console.log('Comment submitted successfully:', responseData.message);
            window.location.href = responseData.redirectUrl || '/';
          } else {
            console.error('Error submitting comment:', responseData.error || response.statusText);
          }
        } catch (error) {
          console.error('Error submitting comment:', error.message);
        }
      });
    }
  });
  