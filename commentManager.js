// commentManager.js
// Handles comment deletion and UI updates

document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading comments (replace with real data in production)
    const comments = [
        {id: 1, author: 'booms', content: 'hi', date: '6 minutes ago', post: 'Music'},
        {id: 2, author: 'booms', content: 'sick track', date: '19 minutes ago', post: 'Music'},
    ];
    
    function renderComments() {
        const container = document.getElementById('user-comments-container');
        container.innerHTML = '';
        if (comments.length === 0) {
            container.innerHTML = `<div class='empty-comments-message' style='text-align:center;padding:2rem;'><i class='fas fa-comments' style='font-size:3rem;color:var(--text-muted);margin-bottom:1rem;'></i><p>You haven't made any comments yet.</p></div>`;
            return;
        }
        const currentUser = 'booms'; // Replace with actual logged-in user in production
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            let deleteBtn = '';
            if (comment.author === currentUser) {
                deleteBtn = `<button class='comment-delete-btn' title='Delete comment' data-id='${comment.id}'><i class='fas fa-trash'></i></button>`;
            }
            div.innerHTML = `
                ${deleteBtn}
                <div class='comment-content'>${comment.content}</div>
                <div class='comment-meta'>
                    <span>${comment.post}</span>
                    <span>${comment.date}</span>
                </div>
            `;
            container.appendChild(div);
        });
        // Add delete event listeners
        document.querySelectorAll('.comment-delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.getAttribute('data-id'));
                deleteComment(id);
            });
        });
    }

    function deleteComment(id) {
        const idx = comments.findIndex(c => c.id === id);
        if (idx !== -1) {
            comments.splice(idx, 1);
            renderComments();
        }
    }

    // Expose for modal open
    window.loadUserComments = renderComments;

    // If the modal is already open, render comments
    if (document.getElementById('comment-management-modal').style.display === 'flex') {
        renderComments();
    }
});
