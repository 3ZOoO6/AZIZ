// استخدام import بدلاً من require
import { Octokit } from "@octokit/rest";

// تهيئة Octokit مع رمز الوصول
const octokit = new Octokit({
    auth: 'YOUR_GITHUB_TOKEN', // استبدل برمز الوصول الخاص بك
});

// دالة البوت للتفاعل مع GitHub
async function runBot() {
    try {
        // الحصول على القضايا المفتوحة
        const { data: issues } = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: 'octocat',
            repo: 'Spoon-Knife',
            state: 'open',
        });

        // إرسال رد تلقائي على كل قضية
        issues.forEach(async issue => {
            await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: 'octocat',
                repo: 'Spoon-Knife',
                issue_number: issue.number,
                body: 'شكرًا على فتح هذه القضية! سنقوم بمراجعتها قريبًا.',
            });
        });

        console.log('تم إرسال الردود التلقائية بنجاح.');
    } catch (error) {
        console.error('حدث خطأ:', error);
    }
}

// تشغيل دالة البوت
runBot();
