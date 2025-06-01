document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data
    fetch('/api/users/profile')
        .then(response => response.json())
        .then(user => {
            document.getElementById('userAvatar').src = user.avatar;
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email;
            document.getElementById('highScore').textContent = `${user.highScore} WPM`;
            document.getElementById('averageWPM').textContent = `${user.averageWPM} WPM`;
            document.getElementById('testsCompleted').textContent = user.testsCompleted;
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Fetch recent tests
    fetch('/api/users/recent-tests')
        .then(response => response.json())
        .then(tests => {
            const tbody = document.getElementById('recentTestsBody');
            tests.forEach(test => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(test.createdAt).toLocaleDateString()}</td>
                    <td>${test.wpm}</td>
                    <td>${test.accuracy}%</td>
                    <td>${test.language === 'en' ? 'English' : 'French'}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching recent tests:', error));
});